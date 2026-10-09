            const tbodyAmerica = document.querySelector("#america");
            const tbodyEuropa = document.querySelector("#europa");
            const tbodyOtros = document.querySelector("#otros");

            const ENDPOINT = "https://api.myjson.online/v1/records/35f681cf-26fd-473c-8dd4-fcf2a61b9107";

            const paisesAmerica = ["Argentina", "Brazil", "Canada", "Chile", "Colombia", "Mexico", "United States"];
            const paisesEuropa = ["Austria", "Belgium", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Ireland", "Italy", "Netherlands", "Sweden", "Switzerland", "United Kingdom"];

            let htmlAmerica = "";
            let htmlEuropa = "";
            let htmlOtros = "";

            var cuenta_america = 0;
            var cuenta_europa = 0;
            var cuenta_otros = 0;

            fetch(ENDPOINT)
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        throw new Error("Error HTTP: " + respuesta.status);
                    }
                    return respuesta.json();
                })
                .then((datos) => {
                    const escuelas = datos.data;

                    escuelas.forEach((e) => {
                        const esAmericana = paisesAmerica.some((pais) => e.location.includes(pais));
                        const esEuropea = paisesEuropa.some((pais) => e.location.includes(pais));

                        const pais = e.location.split(", ").pop();
                        const fila = `<tr><td>${e.rank}</td><td>${e.name}</td><td>${pais}</td></tr>`;

                        if (esAmericana) {
                            htmlAmerica += fila;
                            cuenta_america = cuenta_america + 1;
                        } else if (esEuropea) {
                            htmlEuropa += fila;
                            cuenta_europa = cuenta_europa + 1;
                        } else {
                            htmlOtros += fila;
                            cuenta_otros = cuenta_otros + 1;
                        }
                    });

                    tbodyAmerica.innerHTML = htmlAmerica;
                    tbodyEuropa.innerHTML = htmlEuropa;
                    tbodyOtros.innerHTML = htmlOtros;

                    document.querySelector("#bolitas_americanas").innerHTML = bolitas(cuenta_america);
                    document.querySelector("#bolitas_europeas").innerHTML = bolitas(cuenta_europa);
                    document.querySelector("#bolitas_otras").innerHTML = bolitas(cuenta_otros);
                })
                .catch((error) => {
                    console.error("Algo salió mal:", error);
                });

            function bolitas(x) {
                var visual = "";
                for (let i = 0; i < x; i++) {
				visual +=  `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>`;
                }
                return "<span>" + visual + "</span>";
            }