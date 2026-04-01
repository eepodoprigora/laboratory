// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export function isTelegramWebView() {
    return (
        typeof window.TelegramWebview !== 'undefined' || // Android
        typeof window.TelegramWebviewProxy !== 'undefined' || // iOS
        typeof window.TelegramWebviewProxyProto !== 'undefined' // iOS (иногда)
    );
}
