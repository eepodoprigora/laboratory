export function mergeRefs<T = unknown>(refs: Array<React.Ref<T> | null | undefined>): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (ref != null) {
                if (typeof ref === 'function') {
                    ref(value);
                } else {
                    (ref as React.RefObject<T | null>).current = value;
                }
            }
        });
    };
}
