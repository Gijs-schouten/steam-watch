import { EventBridgeDestination } from "aws-cdk-lib/aws-lambda-destinations";
import {launch, Page, Browser} from "puppeteer"

export const handler = async (event: EventBridgeDestination) => {
    const browser = await launch();
    const page = await browser.newPage();
    const url = "https://steamcommunity.com/market/listings/730/%E2%98%85%20Hand%20Wraps%20%7C%20Giraffe%20%28Field-Tested%2"
    const priceSelector = "span.market_listing_price market_listing_price_with_fee"


    const ftPrice = scrapeValue(url, priceSelector, page, browser);

    console.log(`The scraped value is: ${ftPrice}`);
    return;
}

async function scrapeValue(url: string, selector: string, page: Page, browser: Browser): Promise<string | null> {
    try {
      await page.goto(url);
      
      // Wait for the selector to be available
      await page.waitForSelector(selector);
  
      // Extract the value from the specified selector
      const value = await page.$eval(selector, (element) => element.textContent);
  
      return value;
    } catch (error) {
      console.error('Error during scraping:', error);
      return null;
    }
  }
  