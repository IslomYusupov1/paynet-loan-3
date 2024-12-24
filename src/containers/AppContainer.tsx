import RootContainer from "./RootContainer.tsx";

function AppContainer() {
    // padding-top: env(safe-area-inset-top, 44px);
    const userAgent = navigator.userAgent || navigator.vendor;
    const headerElement: any = document.querySelector('.main-height-container')

    if (!headerElement) return; // Проверить, существует ли элемент

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        // Проверяем, поддерживается ли env(safe-area-inset-top)
        let safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)')) || 44; // Если значение не возвращается, используем 44
        headerElement.style.paddingTop = `${safeAreaTop}px`;
    } else {
        // Android: фиксированный расчет
        const statusBarHeight = 24 * window.devicePixelRatio; // Примерное значение
        headerElement.style.paddingTop = `${statusBarHeight}px`;
    }
    return (
        <RootContainer/>
    );
}

export default AppContainer;