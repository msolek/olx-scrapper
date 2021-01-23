const puppeteer = require("puppeteer");

module ScrapperService {
  export async function scrapeName(url: String, callback: any) {
    async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const titleElement = await page.$eval(
        ".offer-titlebox h1",
        (element: any) => element.outerHTML
      );
      const titleParsed = await titleElement.replace(/<[^>]*>/g, "");
      const imgURL = await page.$eval(".bigImage", (e: any) => e.src);
      let title = titleParsed.toString();
      title = title.trim();
      await browser.close();
      callback({ title, imgURL });
    };
  }
}
