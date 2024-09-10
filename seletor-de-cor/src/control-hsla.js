export function initControlsHsla() {
    const inputsList = document.querySelectorAll('#color-controls-hsla input[type=range]');

    inputsList.forEach(inputElement => {
        inputElement.oninput = onChangeRangesHSLA;
    });
}

const onChangeRangesHSLA = () => {
    const h = document.querySelector('#h').value;
    const s = document.querySelector('#s').value;
    const l = document.querySelector('#l').value;
    const a = document.querySelector('#a').value;
    console.log(red);

    document.querySelector('#color-display-hsla').style.backgroundColor = 
        `hsla(${h}, ${s}%, ${l}%, ${a})`

    console.log(`hsla(${h}, ${s}%, ${l}%, ${a})`)
}