const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
const phone = document.getElementById('phone');

let lastActive = null;

if (phone) {
    phone.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');
}

if (openBtn && dlg) {
    openBtn.addEventListener('click', () => {
        lastActive = document.activeElement;
        dlg.showModal();
        const firstInput = dlg.querySelector('input, select, textarea, button');
        if (firstInput) firstInput.focus();
    });
}

if (closeBtn && dlg) {
    closeBtn.addEventListener('click', () => dlg.close('cancel'));
}

if (form) {
    form.addEventListener('submit', (e) => {
        [...form.elements].forEach(el => {
            if (el.setCustomValidity) el.setCustomValidity('');
        });
        
        if (!form.checkValidity()) {
            e.preventDefault();
            
            const email = form.elements.email;
            if (email && email.validity.typeMismatch) {
                email.setCustomValidity('Введите корректный e-mail, например name@example.com');
            }
            
            form.reportValidity();
            [...form.elements].forEach(el => {
                if (el.willValidate) {
                    el.toggleAttribute('aria-invalid', !el.checkValidity());
                }
            });
            return;
        }
        
        e.preventDefault();
        alert('Успешная отправка!');
        if (dlg) dlg.close('success');
        form.reset();
    });
}

if (dlg) {
    dlg.addEventListener('close', () => {
        if (lastActive) lastActive.focus();
    });
}

if (phone) {
    phone.addEventListener('input', (e) => {
        const input = e.target;
        const digits = input.value.replace(/\D/g, '');
        let formattedValue = '+7';
        
        if (digits.length > 1) {
            const rest = digits.slice(1);
            formattedValue += ' (' + rest.substring(0, 3);
            
            if (rest.length > 3) {
                formattedValue += ') ' + rest.substring(3, 6);
            }
            
            if (rest.length > 6) {
                formattedValue += '-' + rest.substring(6, 8);
            }
            
            if (rest.length > 8) {
                formattedValue += '-' + rest.substring(8, 10);
            }
        }
        
        input.value = formattedValue;
    });
}