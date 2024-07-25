document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chatHeader');
    const chatFoto = document.getElementById('chatFoto');
    const chatNome = document.getElementById('chatNome');
    const chatmensagens = document.getElementById('chatmensagens');
    const mensagemInput = document.getElementById('mensagemInput');
    const sendMessageButton = document.getElementById('sendMessage');

    // Sample data for demonstration
    const contactData = {
        '1': {
            name: 'Parceiro',
            pic: './profile.png',
            messages: [
                { type: 'received', text: 'Oie, quer jogar?' },
                { type: 'sent', text: 'Bora' }
            ]
        },
        '2': {
            name: 'Equipe',
            pic: './profile.png',
            messages: [
                { type: 'received', text: 'Olá, vimos suas plays e gostamos, temos uma proposta para você' }
            ]
        }
    };

    document.querySelectorAll('.contato').forEach(contact => {
        contact.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            // Get the contact ID from the attribute
            const contactId = this.getAttribute('contato-id');
            const contactInfo = contactData[contactId];

            // Update chat header
            chatFoto.src = contactInfo.pic;
            chatNome.textContent = contactInfo.name;

            // Clear previous messages
            chatmensagens.innerHTML = '';

            // Append new messages
            contactInfo.messages.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${message.type}`;
                messageDiv.innerHTML = `<p>${message.text}</p>`;
                chatmensagens.appendChild(messageDiv);
            });

            // Scroll to the bottom of the chat messages
            chatmensagens.scrollTop = chatmensagens.scrollHeight;
        });
    });

    sendMessageButton.addEventListener('click', function() {
        const newMessageText = mensagemInput.value.trim();
        
        if (newMessageText) {
            // Append the new message (assuming it's always 'sent' for now)
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `<p>${newMessageText}</p>`;
            chatmensagens.appendChild(messageDiv);

            // Clear input field
            mensagemInput.value = '';

            // Scroll to the bottom of the chat messages
            chatmensagens.scrollTop = chatmensagens.scrollHeight;
        }
    });
});
