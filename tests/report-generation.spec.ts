import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Reviewer" }).click();
  await expect(page.getByRole("heading", { name: "Reporting" })).toBeVisible();
  await page.locator("button").filter({ hasText: "All" }).click();
  await page.getByLabel("All").click();
  await page
    .locator("div")
    .filter({ hasText: /^Start DatePick a date$/ })
    .getByRole("button")
    .click();
  await page.getByText("16").click();
  await page.getByRole("button", { name: "Pick a date" }).click();
  await page.getByRole("gridcell", { name: "29" }).nth(3).click();
  await page
    .locator("div")
    .filter({ hasText: /^Columns$/ })
    .locator("div")
    .nth(1)
    .click();
  await page.getByRole("option", { name: "Id" }).click();
  await page.getByRole("option", { name: "Subject" }).click();
  await page.getByRole("option", { name: "Message Body" }).click();
  await page.getByRole("option", { name: "Message Type" }).click();
  await page.getByRole("option", { name: "Date Created" }).click();
  await page.getByRole("option", { name: "Sender" }).click();
  await page.getByRole("button", { name: "Generate Report" }).click();
  await expect(
    page.getByRole("heading", { name: "Messages Report" })
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Id" }).nth(1)).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Subject" }).nth(1)
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Message Body" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Message Type" }).nth(1)
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Date Created" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Sender" })).toBeVisible();
});
