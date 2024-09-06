const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");


btn.addEventListener("click", async () => {
  let inputWord = document.getElementById("input-box").value;
  inputWord = inputWord.trim();

  try {
    const response = await fetch(`${url}${inputWord}`);
    const data = await response.json();
    let audioSrc = "";

    console.log(assignSrc(data[0].phonetics,audio));

    data[0].phonetics.map((data) => {
      audioSrc ||= data.audio;
    });
    
    let definitionSrc = "", exampleSrc = "";
    data[0].meanings[0].definitions.map((data) => {
      definitionSrc ||= data.definition;
      exampleSrc ||= data.example;    
    });


    result.innerHTML = `<div class="word">
          <h3>${inputWord}</h3>
          <button onClick='playsound()'>
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
            ${definitionSrc}
        </p>
        <p class="word-example">${exampleSrc}</p>`;

    sound.setAttribute("src", `${audioSrc}`);
  } catch (error) {
    console.error("Failed To Fetch Meaning: ", error);
    result.innerHTML = '<h3 class = "error">Could not Find The Word</h3>';
  }
});

function playsound() {
  sound.play();
}
