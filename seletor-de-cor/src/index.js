import { initControlsHsla } from "./control-hsla.js";

const $ = document.querySelector.bind(document)
const $all = document.querySelectorAll.bind(document)

const directRed = $('#direct-red')
const directGreen = $('#direct-green')
const directBlue = $('#direct-blue')

// No caso do Firefox, ele mantém a última seleção após a recarga da página
directRed.checked = false
directGreen.checked = false
directBlue.checked = false

const onChangeRangesRGBA = () => {
    const red = $('#red').value
    const green = $('#green').value
    const blue = $('#blue').value
    const alpha = $('#alpha').value

    $('#color-display-rgba').style.backgroundColor = 
        `rgba(${red}, ${green}, ${blue}, ${alpha})`
    
    directRed.checked = false
    directGreen.checked = false
    directBlue.checked = false
}

$all(
    '#color-controls-rgba input[type=range]'
).forEach((range) => range.oninput = onChangeRangesRGBA)

const changeByDirectColor = (color) => {
    $('#color-display-rgba').style.backgroundColor = color
    $('#red').value = 0
    $('#green').value = 0
    $('#blue').value = 0
    $('#alpha').value = 1
}

directRed.onclick = () => changeByDirectColor('rgb(255, 0, 0)')
directGreen.onclick = () => changeByDirectColor('rgb(0, 255, 0)')
directBlue.onclick = () => changeByDirectColor('rgb(0, 0, 255)')

initControlsHsla()