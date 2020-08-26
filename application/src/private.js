var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

// Win 10/Docker Desktop for Windows uses localhost
// Win10 has a platform of Win32 - so need an additional check
// on the appVersion to avoid matching the platform
const win10 = RegExp("Windows NT 10.0*");

if (win10.test(window.navigator.appVersion)) {
    windowsPlatforms = [];
}

export const SERVER_IP = windowsPlatforms.indexOf(window.navigator.platform) < 0 ? 'http://localhost:4000' : 'http://192.168.99.100:4000';