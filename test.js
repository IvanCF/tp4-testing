const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
require("chromedriver");
var chrome = require('selenium-webdriver/chrome');
const { doesNotMatch } = require('assert');




describe('Prueba que accede al tercer vínculo no patrocinado de una búsqueda en Google.', async function () {
    let driver;
    const options = new chrome.Options();
    //options.add_experimental_option("excludeSwitches", ["enable-logging"]);

    before(async function () {
        driver = new Builder().forBrowser('chrome').
            setChromeOptions(options).build();
    });

    it('Se busca el término "IoT".', async function () {
        await this.timeout(20000);

        /****************** ENTRAMOS A GOOGLE ***********************************************/
        await driver.get("http://google.com");

        /****************** BUSCAMOS LA PALABRA**********************************************/
        await driver.findElement(By.name("q")).sendKeys("IoT", Key.RETURN);

        /***************** SE OBTIENE EL 3ER ENLACE******************************************/
        resultado_google = await driver.findElement(By.xpath('//div[@class="hlcw0c" or @class="g"][3]'));
        texto_completo = await resultado_google.getText();

        /**************** OBTENGO LA URL PRINCIPAL ***** */
        url_esperado = texto_completo.substring(texto_completo.indexOf("\n") + 1).slice(0, 22);

        /*************** INGRESO A LA RUTA DEL 3ER RESULTADO *******************************/
        console.log("Obtengo: "+url_esperado);
        await resultado_google.click();

        url_destino="https://www.redhat.com";
        console.log("Destino: "+url_destino);

        /************** COMPARO RESULTADOS *************************************************/
        expect(url_destino).to.equal(url_esperado);

    }).catch(err => done(err));

    after(async function () {
        driver && driver.quit()
    });
})

