import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Reviewer" }).click();
  await expect(
    page.getByRole("heading", { name: "Review Messages" })
  ).toBeVisible();
  await expect(page.getByText("SearchIdMessage")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reporting" })).toBeVisible();
  await page.locator("button").filter({ hasText: "All" }).click();
  await page.getByLabel("All").click();
  await page
    .locator("div")
    .filter({ hasText: /^Start DatePick a date$/ })
    .getByRole("button")
    .click();
  await page.getByText("11", { exact: true }).click();
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
  await page.getByRole("button", { name: "Print" }).click();
});
