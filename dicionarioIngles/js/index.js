const btnSearch = document.querySelector('.btn-search');
const containerResults = document.querySelector(".container-results");
let listWords;

const apiConsult = async (word) => {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(apiUrl);
    const results = await response.json();
    listWords = results;
    return results
};

const writeResultInHtml = async (word) => {
    containerResults.innerText = '';
    const results = await apiConsult(word);
    console.log(results);


    results.forEach((element, position) => {
        let audioQtd = element.phonetics.length;

        /*
        element.phonetics.forEach(audioArray, pos => {
            if (phonetics.audio[pos] != null) {
              audioQtd++;
            };
        });
        console.log(element.phonetics);
        */

        const newCard = `
                <div class="card-result">
                    <span class="word">
                        ${position + 1} - ${element.word}
                    </span>
                    <span class="word-info-result">
                        ${element.phonetics.length} significado(s) de  ${audioQtd} audio
                    </span>
                </div>
        `;

        containerResults.insertAdjacentHTML("beforeend", newCard);
    });
};

btnSearch.addEventListener("click", function () {
    const inputSearch = document.getElementById('input-search').value;
    writeResultInHtml(inputSearch)
});
