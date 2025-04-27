document.getElementById('upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
          document.getElementById('upload').style.display = 'none';
            const text = event.target.result;
            const lines = text.split('\n');

            const data = {}; // category -> array of questions
            const categories = []; // array of category names in order

            lines.slice(1).forEach(line => {
                const [category, amount, question, answer] = line.split(',');
                if (!category) return;

                if (!data[category]) {
                    data[category] = [];
                    categories.push(category); // record the first time we see a new category
                }

                data[category].push({ amount: parseInt(amount), question, answer, asked: false });
            });

            console.log(data);

            renderBoard(data, categories);
        };

        reader.readAsText(file);
    });

    function renderBoard(data, categories) {
        const board = document.getElementById('board');
        board.innerHTML = '';
        board.style.display = 'grid';
        board.style.gridTemplateColumns = 'repeat(6, 1fr)';

        // Render headers
        categories.forEach(category => {
            const div = document.createElement('div');
            div.innerText = category;
            div.className = 'square';
            div.style.fontWeight = 'bold';
            div.style.color = 'Yellow';
            div.style.background = 'darkblue'; // Make headers look different maybe
            board.appendChild(div);
        });

        // Render each question row
        for (let i = 0; i < 5; i++) {
            categories.forEach(category => {
                const q = data[category][i];
                const div = document.createElement('div');
                div.className = 'square';

                if (q) {
                    div.innerText = `$${q.amount}`;
                    let clickCount = 0;

                    div.addEventListener('click', () => {
                        clickCount = (clickCount + 1) % 3;
                        if (clickCount === 1) {
                            div.innerText = q.question;
                        } else if (clickCount === 2) {
                            div.innerText = q.answer;
                        } else {
                            div.innerText = `$${q.amount}`;
                            div.classList.add('asked');
                        }
                    });
                } else {
                    div.innerText = ''; // empty cell
                }

                board.appendChild(div);
            });
        }
    }