document.addEventListener('DOMContentLoaded', function () {
    const commentTable = document.getElementById("commentsTable")
    const maxRows = 2;
    const maxCols = 3;
    const maxStar = 5;
    const maxSymbols= 40;
    const IMG_STAR_URL='assets/images/star.svg'
    const root = document.documentElement;

    loadComments();

    async function loadComments() {
        try {
            let rows=0;
            const response = await fetch('data/comment.json')
            if (!response.ok) throw new Error(`Http error! status: ${response.status}`);
            const data = await response.json()

            if (!Array.isArray(data) || data.length === 0) {
                console.log("No data to display");
                return;
            }

            let i = 0;
            for (let row = 0; row < maxRows; row++) {
                const dataRow = document.createElement('div')
                dataRow.classList.add('row')

                for (let col = 0; col < maxCols; col++) {
                    const comment = data[i];
                    if (!comment) { commentTable.appendChild(dataRow); ++rows;return };
                    const dataCol = document.createElement('div');
                    dataCol.classList.add('col')
                    
                    //create stars line
                    const starLineDiv = document.createElement('div');
                    starLineDiv.classList.add('stars')
                    for (let count = 0; (count < comment.star)&&(count<maxStar); count++) {
                        const img=document.createElement('img')
                        img.src=IMG_STAR_URL;
                        img.alt='star';
                        starLineDiv.appendChild(img);
                    }
                    dataCol.appendChild(starLineDiv);
                    let processed = comment.text;

                    if (processed.length > maxSymbols){
                        const lastSpaceIndex = processed.lastIndexOf(' ', (maxSymbols-3));
                        processed = (lastSpaceIndex > 0) 
                        ? processed.slice(0, lastSpaceIndex) 
                        : processed.slice(0, maxSymbols);
                      processed += '...';
                    }


                    dataCol.insertAdjacentHTML(
                        'beforeend',
                        `<h4>${processed}</h4><h6>${comment.autor}</h6>`
                    );
                    dataRow.appendChild(dataCol)
                    i++;
                }
                commentTable.appendChild(dataRow)
                ++rows;
            }
            root.style.setProperty('--size-table-rows',rows)
            root.style.setProperty('--size-table-cols',maxCols)
        } catch (error) {
            console.error("error load comments:", error)
        }
    }
})