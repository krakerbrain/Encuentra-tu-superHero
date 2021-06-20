$("document").ready(function () {
  // SE TOMA EL VALOR DEL INPUT
  $("form").submit(function (event) {
    event.preventDefault();

    // SE INGRESA EN LA VARIABLE
    let valueInput = $("#heroInput").val();

    // SE VALIDA QUE EL USUARIO NO INGRESE UN NUMERO MAYOR A 731, YA QUE ESA ES LA CANTIDAD DE HEROES
    if (valueInput > 731) {
      alert("Solo hay 731 SuperHero registrados.\n Por favor ingrese un número entre 1 y 731");
    }

    // SE CREA LA CONSULTA AJAX USANDO EL VALOR DEL INPUT

    $.ajax({
      url: "https://superheroapi.com/api.php/4379517335406144/" + valueInput,
      success: function (data) {
        let imagen = data.image.url;
        let nombre = data.name;
        let conexiones = data.connections["group-affiliation"];
        let publicado = data.biography.publisher;
        let ocupacion = data.work.occupation;
        let primeraAparicion = data.biography["first-appearance"];
        let altura = data.appearance.height;
        let peso = data.appearance.weight;
        let alias = data.biography.aliases;
        let poder = data.powerstats.intelligence;

        // SE CREA UNA VALIDACION PARA ALGUNOS DATOS QUE NO APARECEN EN EL REGISTRO
        if (ocupacion == "-") {
          ocupacion = "Sin ocupación conocida";
        }
        if (conexiones == "-") {
          conexiones = "Sin conexiones conocidas";
        }
        if (primeraAparicion == "-") {
          primeraAparicion = "No se tiene registro";
        }
        if (poder == "null"){
          alert ('Todos los datos de este heroe son nulos.\n NO SE MOSTRARAN ESTADISTICAS')
        }

        // SE INGRESAN LOS DATOS PARA LA TARJETA DEL SUPERHEROE
        $("#heroInfo").html(`


    <div class="row">
      <div class="col-md-4 my-auto text-center ">
        <img id="heroImg" src="${imagen}" height="350px" />
      </div>
      <div class="col-md-4">
        <div class="card-body">
          <h5 class="card-text"><b>NOMBRE:</b></h5>
          <h4 class="card-title"><b>${nombre}</b></h4>
          <p class="card-text"><b>CONEXIONES:</b> ${conexiones}.</p>
          <p class="card-text"><b>FECHA DE PUBLICACION:</b> ${publicado}.</p>
          <p class="card-text"><b>OCUPACION:</b> ${ocupacion}.</p>
          <p class="card-text"><b>PRIMERA APARICION:</b> ${primeraAparicion}.</p>
          <p class="card-text"><b>ALTURA:</b> ${altura}.</p>
          <p class="card-text"><b>PESO:</b> ${peso}.</p>
          <p class="card-text"><b>ALIAS:</b> ${alias}.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div id="heroStats" style="height: 360px; width: 100%"></div>
      </div>
    </div>
  </div>
        `);

        // SE USA METODO PARA INGRESAR DATOS EN LA ESTADISTICA DEL CHART DE CANVAS

        let estadisticas = [];

        estadisticas.push(
          { y: data.powerstats.intelligence, label: "Inteligencia" },
          { y: data.powerstats.strength, label: "Fuerza" },
          { y: data.powerstats.speed, label: "Velocidad" },
          { y: data.powerstats.durability, label: "Resistencia" },
          { y: data.powerstats.power, label: "Poder" },
          { y: data.powerstats.combat, label: "Combate" }
        );

        let config = {
          theme: "light1",
          animationEnabled: true,
          title: {
            text: `Estadisticas de Poder para ${data.name}`,
          },
          data: [
            {
              type: "pie",
              startAngle: 25,
              toolTipContent: "<b>{label}</b>: {y}",
              showInLegend: "true",
              legendText: "{label} - {y}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - {y}",
              dataPoints: estadisticas,
            },
          ],
        };
        // RENDERIZAMOS Y ENVIAMOS LA INFO
        let chart = new CanvasJS.Chart("heroStats", config);
        chart.render();
      },
    });
  });
});
