const messages = document.getElementById('messages');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let esperandoConfirmacionRival = false;

sendBtn.addEventListener('click', sendMessage);

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});


function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    const respuesta = getBotResponse(text);
    addMessage(respuesta, 'bot');
  }, 600);
}


function addMessage(text, type) {
  const div = document.createElement('div');
  div.classList.add('message', type);
  div.innerHTML = `<span>${text}</span>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}


function getBotResponse(text) {
  text = text.toLowerCase();

  if (text.includes('rival')|| text.includes('reportar') || text.includes('reporte')) {
    esperandoConfirmacionRival = true;
    return '¿hay algún problema con alguno de los "rivales" de la página?';
  }

  if (
    esperandoConfirmacionRival &&
    (
      text === 'si' ||
      text === 'sí' ||
      text.includes('tengo un problema') ||
      text.includes('reportar') ||
      text.includes('quiero reportar')
    )
  ) {
    esperandoConfirmacionRival = false;

    return `
      Entiendo, puedes realisar un reporte aquí y en momentos lo revisaremos y daremos respuesta:<br><br>
      <a href="reportes.html" class="chat-link-btn">
        Ir a reportes
      </a>
    `;
  }

  if (esperandoConfirmacionRival && text.includes('no')) {
    esperandoConfirmacionRival = false;
    return 'Perfecto, si necesitas algo más aquí estoy.';
  }

  if (text.includes('precio') || text.includes('costo') || text.includes('pago') || text.includes('pagar')) {
    return 'Los precios varían según la recarga seleccionada ⭐';
  }

  if (text.includes('hola')) {
    return '¡Hola! ¿En qué puedo ayudarte?';
  }

  if (text.includes('problema')) {
    return 'Cuéntame tu problema y con gusto te ayudo';
  }

  return 'Gracias por tu mensaje, un asesor te responderá pronto';
}