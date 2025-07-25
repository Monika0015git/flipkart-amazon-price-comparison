import { test, chromium, expect } from "@playwright/test";

test.setTimeout(180000);

test("Compare iPhone 15 Plus price on Flipkart vs Amazon", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const amazonPage = await context.newPage();
  const flipkartPage = await context.newPage();

  const productName = "iphone 15 plus";

  // Navigate to Amazon
  console.log("🟠 Navigating to Amazon...");
  await amazonPage.goto("https://www.amazon.in");
  await expect(amazonPage).toHaveURL(/amazon\.in/);
  await expect(amazonPage).toHaveTitle(/Amazon\.in/);

  await amazonPage.fill("#twotabsearchtextbox", productName);
  await amazonPage.press("#twotabsearchtextbox", "Enter");
  await amazonPage.waitForSelector("div.s-main-slot", { timeout: 180000 });

  const amazonFirstProduct = amazonPage
    .locator("div.s-main-slot div[data-component-type='s-search-result']")
    .first();
  await amazonFirstProduct.waitFor();

  const amazonTitle = await amazonFirstProduct.locator("h2 span").textContent();
  const amazonPriceText = await amazonFirstProduct
    .locator("span.a-price-whole")
    .first()
    .textContent();
  const amazonPrice = amazonPriceText
    ? parseInt(amazonPriceText.replace(/[^0-9]/g, ""), 10)
    : null;

  if (!amazonTitle || !amazonPrice) throw new Error("❌ Failed to get product or price from Amazon");
  console.log(`🟡 Amazon: ${amazonTitle.trim()} @ ₹${amazonPrice}`);

  // Navigate to Flipkart
  console.log("🔵 Navigating to Flipkart...");
  await flipkartPage.goto("https://www.flipkart.com");
  try {
    const closeBtn = flipkartPage.locator("button._2KpZ6l._2doB4z");
    if (await closeBtn.isVisible()) await closeBtn.click();
  } catch {}

  await expect(flipkartPage).toHaveURL(/flipkart\.com/);
  await expect(flipkartPage).toHaveTitle(/Online Shopping Site/);

  await flipkartPage.fill("input[name='q']", productName);
  await flipkartPage.press("input[name='q']", "Enter");
  await flipkartPage.waitForTimeout(3000);

  const flipkartProduct = flipkartPage
    .locator("div.tUxRFH")
    .filter({ hasText: "iPhone 15 Plus" })
    .first();

  await flipkartProduct.waitFor({ timeout: 180000 });

  const flipkartTitle = await flipkartProduct.locator("div.KzDlHZ").first().textContent();
  const flipkartPriceText = await flipkartProduct.locator("div.Nx9bqj._4b5DiR").first().textContent();
  const flipkartPrice = flipkartPriceText
    ? parseInt(flipkartPriceText.replace(/[^0-9]/g, ""), 10)
    : null;

  if (!flipkartTitle || !flipkartPrice) throw new Error("❌ Failed to get product or price from Flipkart");
  console.log(`🔷 Flipkart: ${flipkartTitle.trim()} @ ₹${flipkartPrice}`);

  // Assertions
  expect(amazonPage.url()).toContain("amazon.in");
  expect(flipkartPage.url()).toContain("flipkart.com");
  expect(amazonTitle.toLowerCase()).toContain("iphone");
  expect(flipkartTitle.toLowerCase()).toContain("iphone");
  expect(flipkartPrice).toBeLessThan(amazonPrice);

  console.log("✅ Flipkart is cheaper. Test Passed.");

  await browser.close();
});