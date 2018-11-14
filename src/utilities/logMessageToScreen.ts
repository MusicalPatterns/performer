const logMessageToScreen: (message: string) => void =
    (message: string): void => {
        const messageDiv: HTMLDivElement = document.createElement('div')
        document.body.appendChild(messageDiv)
        messageDiv.innerText = message
    }

export {
    logMessageToScreen,
}
