import fs from 'fs';

async function deepAnalyze() {
  const homeRes = await fetch('https://ribana.com.bd/');
  const homeHtml = await homeRes.text();

  // Extract all product links
  const productLinks = [...new Set([...homeHtml.matchAll(/href="(\/products\/[^"]+)"/g)].map(m => m[1]))];
  console.log('Total Product Links found:', productLinks.length);
  console.log('Sample Product Links:', productLinks.slice(0, 10));

  // Extract Announcement bar & Header text
  const announcement = homeHtml.match(/<div[^>]*announcement[^>]*>([\s\S]*?)<\/div>/i)?.[0];
  console.log('Announcement Bar snippet:', announcement ? announcement.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200) : 'None');

  // Extract Hero Banner headings
  const h1s = [...homeHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2s = [...homeHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log('H1 Headings:', h1s);
  console.log('H2 Headings:', h2s.slice(0, 10));

  // Now inspect one specific top product: Saffron Brightening Serum
  const prodSlug = productLinks[0] || '/products/ribana-saffron-brightening-serum-30ml';
  console.log('\n--- Fetching Product Details: ' + prodSlug + ' ---');
  const prodRes = await fetch('https://ribana.com.bd' + prodSlug);
  const prodHtml = await prodRes.text();

  // Extract Product Details: Title, Price, Description, Ingredients, How to Use, Badges
  const prodTitle = prodHtml.match(/<h1[^>]*class="[^"]*product__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
    || prodHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  console.log('Product Title:', prodTitle?.replace(/<[^>]+>/g, '').trim());

  const priceMatch = prodHtml.match(/class="[^"]*price[^"]*"[\s\S]*?<\/div>/i)?.[0];
  console.log('Price Snippet:', priceMatch?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150));

  // Look for Tabs / Accordions (Benefits, Ingredients, How to use, Storage)
  const accordionHeadings = [...prodHtml.matchAll(/summary[^>]*>([\s\S]*?)<\/summary>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log('Accordion / Section Headings:', accordionHeadings.slice(0, 8));

  // Check Cart Drawer
  const hasCartDrawer = /cart-drawer|cart__drawer|drawer__inner/i.test(homeHtml);
  console.log('Has Slide Cart Drawer:', hasCartDrawer);

  // Check Colors in CSS or inline
  const colors = [...new Set([...homeHtml.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)].map(m => m[0]))];
  console.log('Dominant Hex Colors sample:', colors.slice(0, 15));
}

deepAnalyze();
