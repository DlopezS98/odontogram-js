import OdontogramFindings from './odontogram-options.json';

export default class CustomMenuContext {
    static initialize() {
        const ul = document.getElementById('contextMenuItems');
        const partialFindings = OdontogramFindings.partialFindings;
        partialFindings.forEach((finding) => {
            const li = document.createElement('li');
            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-tooth');
            icon.style.color = finding.color;
            li.id = finding.id;
            const a = document.createElement('a');
            a.setAttribute('context-menu-item', true);
            // a.dataset.data = JSON.stringify(finding);
            a.onclick= (event) => {
                a.dispatchEvent(CustomMenuContext.createMenuItemClickEvent(finding))
            };
            a.append(icon, finding.name);
            li.appendChild(a);
            ul.appendChild(li);
        });
    }

    static hideMenu(event) {
        document.getElementById("contextOdontogramMenu").style.display = "none";
    }

    static rightClick(event) {
        event.preventDefault();
        if(document.getElementById('contextOdontogramMenu').style.display === 'block')
            return CustomMenuContext.hideMenu(event);

        const menu = document.getElementById("contextOdontogramMenu")      
        menu.style.display = 'block'; 
        menu.style.left = event.pageX + "px"; 
        menu.style.top = event.pageY + "px";
    }

    static createMenuItemClickEvent(data) {
        return new CustomEvent('customMenuContextOptionClick', {
            data,
            bubbles: true,
            cancelable: true,
            composed: true
        })
    }
}