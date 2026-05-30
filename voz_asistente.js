let recognition;
if('webkitSpeechRecognition' in window){recognition=new webkitSpeechRecognition();recognition.lang='es-MX';recognition.continuous=false;recognition.interimResults=false}
document.getElementById('voiceBtn').addEventListener('click',()=>{if(!recognition){alert('Tu navegador no soporta reconocimiento de voz');return}
document.getElementById('voiceStatus').textContent='🎤 Escuchando...';recognition.start();recognition.onresult=(e)=>{let t=e.results[0][0].transcript.toLowerCase();document.getElementById('searchInput').value=t;document.getElementById('voiceStatus').textContent='';buscarProducto();hablar('Buscando '+t)};recognition.onerror=()=>{document.getElementById('voiceStatus').textContent='Error. Intenta de nuevo';setTimeout(()=>document.getElementById('voiceStatus').textContent='',3000)}});
function hablar(texto){if('speechSynthesis' in window){let u=new SpeechSynthesisUtterance(texto);u.lang='es-MX';u.rate=1;u.pitch=1;window.speechSynthesis.speak(u)}}
