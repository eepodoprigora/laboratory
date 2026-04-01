import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { mergeRefs } from '@/shared/lib/merge-refs';
import { ImageShape, VideoShape } from '@/shared/model/types';

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
    ref?: React.Ref<HTMLVideoElement>;
    /**
     * Массив сурсов
     */
    sources: VideoShape;
    /**
     * Превью
     */
    previewImg?: ImageShape | null;
    previewImgSizes?: string;
    /**
     * Автопроигрывание
     */
    autoPlay?: boolean;
    /**
     * Lazy
     */
    lazy?: boolean;
    /**
     * Управление готовностью видео извне
     */
    canPlay?: boolean;
};

const Video = ({
    ref,
    sources,
    previewImg,
    previewImgSizes = '100vw',
    autoPlay,
    lazy = false,
    canPlay,
    ...props
}: Props) => {
    const videoElRef = useRef<HTMLVideoElement>(null);
    const [fallbackToPreviewImg, setFallbackToPreviewImg] = useState(false);
    const [canplay, setCanplay] = useState(false);
    const [lazyLoaded, setLazyLoaded] = useState(!lazy);
    const isReady = canPlay ?? canplay;

    useEffect(() => {
        const autoplayedVideosPlayStateObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    const { target } = entry;

                    if (target instanceof HTMLVideoElement) {
                        if (entry.isIntersecting) {
                            if (target.autoplay && (target.loop || (!target.loop && !target.ended))) {
                                target.play().catch((err) => {
                                    if (err.name === 'NotAllowedError') {
                                        obs.unobserve(target);

                                        if (!target.hasAttribute('data-video-preserve')) {
                                            setFallbackToPreviewImg(true);
                                        }
                                    }
                                });
                            }
                        } else {
                            target.pause();
                        }
                    }
                });
            },
            { rootMargin: '100px' },
        );

        if (videoElRef.current) {
            autoplayedVideosPlayStateObserver.observe(videoElRef.current);
        }

        return () => {
            autoplayedVideosPlayStateObserver.disconnect();
        };
    }, [autoPlay]);

    useEffect(() => {
        const { current } = videoElRef;

        const lazyVideoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        lazyVideoObserver.unobserve(entry.target);
                        flushSync(() => {
                            setLazyLoaded(true);
                        });
                        current?.load();
                    }
                });
            },
            { rootMargin: '1000px' },
        );

        if (current) {
            lazyVideoObserver.observe(current);
        }

        return () => {
            lazyVideoObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (videoElRef.current) {
            if (videoElRef.current.readyState === 4) {
                setCanplay(true);
            } else {
                const onCanPlay = () => {
                    setCanplay(true);
                };
                const { current } = videoElRef;
                current.addEventListener('canplay', onCanPlay, { once: true });

                return () => {
                    current.removeEventListener('canplay', onCanPlay);
                };
            }
        }
    }, []);

    if (sources.length > 0 && !fallbackToPreviewImg) {
        return (
            <>
                <video
                    ref={mergeRefs([ref, videoElRef])}
                    playsInline
                    autoPlay={autoPlay}
                    poster={previewImg?.src}
                    {...props}
                >
                    {sources.map((obj, i) => (
                        <source
                            key={i}
                            {...{
                                [lazyLoaded ? 'src' : 'data-src']:
                                    `${obj.src}${obj.src.includes('#t=') ? '' : '#t=0.001'}`,
                            }}
                            type={obj.type}
                            media={obj.media}
                        ></source>
                    ))}
                </video>
                {previewImg?.src && (
                    <Image
                        src={previewImg.src}
                        width={previewImg.width}
                        height={previewImg.height}
                        alt={previewImg.alt || ''}
                        sizes={previewImgSizes}
                        className={classNames(props.className, 'video__preview-img', {
                            'video__preview-img--ready': isReady,
                        })}
                    />
                )}
            </>
        );
    }

    if (fallbackToPreviewImg && previewImg?.src && canPlay) {
        return (
            <Image
                src={previewImg.src}
                width={previewImg.width}
                height={previewImg.height}
                alt={previewImg.alt || ''}
                sizes={previewImgSizes}
            />
        );
    }

    return null;
};

export default Video;
