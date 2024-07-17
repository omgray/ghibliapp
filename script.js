function myFunction() {
    var input, filter, row, items, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    row = document.getElementById('row');
    items = document.getElementsByClassName('card');
    for (i = 0; i<items.length; i++) {
        h = items[i].getElementsByTagName('h2')[0];
        txtValue = h.textContent || h.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

fetch('https://ghibliapi.vercel.app/films')
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        // work with json data here
        console.log(data)

        const app = document.getElementById('root');
        const nav = document.getElementById('nav');

        const container = document.createElement('div');
        container.setAttribute('class', 'container-fluid');

        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.setAttribute('id', 'row');

        const logo = document.createElement('img');
        logo.src = 'ghibli.png';
        logo.id = 'logo';

        const tagline = document.createElement('h1');
        tagline.textContent = "Studio Ghibli Movie Database"

        const search = document.createElement('input');
        search.setAttribute('type', 'text');
        search.setAttribute('id', 'search');
        search.setAttribute('onkeyup', 'myFunction()');
        search.setAttribute('placeholder', 'Search...');
        search.setAttribute('title', 'Search here.');

        nav.appendChild(logo);
        nav.appendChild(tagline);
        nav.appendChild(search);
        app.appendChild(container);
        container.appendChild(row);



        data.forEach(element => {
            console.log(element);

            const card = document.createElement('div');
            card.setAttribute('class', 'card col-sm-4');

            const header = document.createElement('h2');
            header.textContent = element.title;

            const p = document.createElement('p');
            const descriptionShort = element.description.substring(0,150);
            p.textContent = `${descriptionShort}...`

            const a = document.createElement('a');
            a.innerHTML = 'Read More';
            a.href = "#";

            // a.setAttribute('onclick', 'readMore()')
            a.onclick = function(e) {
                e.preventDefault();
                const modal = document.createElement('div');
                modal.setAttribute('class', 'modal container-fluid');
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'wrapper');
                const title = document.createElement('div');
                title.setAttribute('class', 'title');
                title.innerHTML = `${element.title}`;
                console.log(title);
                const content = document.createElement('div');
                content.setAttribute('class', 'modal-contents');
                const close = document.createElement('span');
                close.setAttribute('onClick', 'closeModal()');
                close.setAttribute('class', 'close cursor');
                close.innerHTML = "&times;"

                const description = element.description.substring(0,999);
                content.innerHTML = `
                ${description} <br>
                <span class="p">Director:</span> ${element.director} <br>
                <span class="p">Producer:</span>  ${element.producer} <br>
                <span class="p">Release Date:</span>${element.release_date} <br>
                <span class="p">Rotten Tomatoes Score:</span>  ${element.rt_score}
                `

                app.appendChild(modal);
                modal.appendChild(wrapper);
                wrapper.appendChild(title);
                wrapper.appendChild(content);
                wrapper.appendChild(close);

                close.onclick = function() {
                    modal.remove();
                }
            }


            
            row.appendChild(card)
            card.appendChild(header);
            card.appendChild(p);
            card.appendChild(a);
        });
    })
