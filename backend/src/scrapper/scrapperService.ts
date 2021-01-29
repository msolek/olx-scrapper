const puppeteer = require("puppeteer");

export const scrapeName = async (url: String, callback: any | null) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const titleElement = await page.$eval(
    ".offer-titlebox h1",
    (element: any) => element.outerHTML
  );
  const titleParsed = await titleElement.replace(/<[^>]*>/g, "");
  let imgURL = null;
  try {
    imgURL = await page.$eval(".bigImage", (e: any) => e.src);
  } catch (err) {
    console.error(err);
  }
  let title = titleParsed.toString();
  title = title.trim();
  await browser.close();
  callback({ title, imgURL });
};

export const checkIsAnnouncementActive = async (
  url: string
): Promise<boolean> => {
  var active = false;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  try {
    const auctionDeactivatedElement = await page.$eval(
      "#offer_removed_by_user strong",
      (element: any) => element
    );
    if (auctionDeactivatedElement) {
      active = false;
    }
  } catch {
    active = true;
  }
  await browser.close();
  return active;
};

export const scrapePrice = async (url: string): Promise<number> => {
  var price = null;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  try {
    const priceElement = await page.$eval(
      ".pricelabel__value",
      (e: any) => e.outerHTML
    );
    price = await priceElement.replace(/\D/g, "");
  } catch (err) {
    console.error(url + " " + err);
    price = 0;
  }
  await browser.close();

  return price;
};
