document.addEventListener('DOMContentLoaded', () => {
    // Elementos da UI
    const tabs = document.querySelectorAll('.tab-button');
    const contentPanes = document.querySelectorAll('.content-pane');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeCanvas = document.getElementById('qr-code-canvas');
    let activeTab = 'url-content';

    // Instância e configuração inicial do QR Code Styling
    const qrCodeInstance = new QRCodeStyling({
        width: 250,
        height: 250,
        type: 'svg',
        data: 'https://github.com/kozakdenys/qr-code-styling',
        image: '',
        dotsOptions: {
            color: '#ffffff', // Cor dos pontos do QR Code
            type: 'rounded'
        },
        backgroundOptions: {
            color: 'transparent',
        },
        cornersSquareOptions: {
            color: '#bd93f9', // Roxo
            type: 'extra-rounded'
        },
        cornersDotOptions: {
            color: '#50fa7b', // Verde
            type: 'dot'
        }
    });

    // Lógica para alternar entre as abas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeTab = tab.dataset.tab;
            
            contentPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === activeTab) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Lógica do botão "Gerar QR Code"
    generateBtn.addEventListener('click', () => {
        let dataToEncode = '';

        switch (activeTab) {
            case 'url-content':
                dataToEncode = document.getElementById('text-input').value;
                break;
            
            case 'vcard-content':
                const name = document.getElementById('vcard-name').value;
                const phone = document.getElementById('vcard-phone').value;
                const email = document.getElementById('vcard-email').value;
                const org = document.getElementById('vcard-org').value;
                // Formato padrão vCard
                dataToEncode = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nTEL;TYPE=CELL:${phone}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;
                break;

            case 'social-content':
                const network = document.getElementById('social-network').value;
                const user = document.getElementById('social-user').value;
                const urls = {
                    instagram: `https://instagram.com/${user}`,
                    twitter: `https://x.com/${user}`,
                    linkedin: `https://linkedin.com/in/${user}`,
                    github: `https://github.com/${user}`,
                    facebook: `https://facebook.com/${user}`
                };
                dataToEncode = urls[network] || '';
                break;
        }

        if (!dataToEncode) {
            alert('Por favor, preencha os campos para gerar o QR Code.');
            return;
        }
        
        // Limpa o canvas antes de gerar um novo código
        qrCodeCanvas.innerHTML = '';
        
        // Atualiza os dados e desenha o novo QR Code
        qrCodeInstance.update({ data: dataToEncode });
        qrCodeInstance.append(qrCodeCanvas);
        
        // Mostra o botão de download
        downloadBtn.classList.remove('hidden');
    });

    // Lógica do botão de Download
    downloadBtn.addEventListener('click', () => {
        qrCodeInstance.download({ name: 'qrcode', extension: 'png' });
    });

});