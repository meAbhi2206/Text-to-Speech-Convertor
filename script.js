let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let isSpeaking = false;

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
    } else {
        speech.text = document.querySelector("textarea").value;
        window.speechSynthesis.speak(speech);
        isSpeaking = true;
    }
});

speech.onend = () => {
    isSpeaking = false;
};
