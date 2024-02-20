import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Reviewer" }).click();
  await page.getByRole("link", { name: "This is a test suggestion" }).click();
  await expect(
    page.getByRole("heading", { name: "Message Details" })
  ).toBeVisible();
  await page.getByRole("heading", { name: "Subject" }).click();
  await page.getByRole("heading", { name: "Message Body" }).click();
  await page.getByText("This is a test suggestion").click();
  await page.getByText("Hello there please consider").click();
  await page.getByText("clstapsp500037z2xzubbni20").first().click();
  await page.getByText("Suggestion", { exact: true }).first().click();
  await page.getByText("Stitch").first().click();
  await page.getByText("Bobio Jones").first().click();
  await page.getByText("Stitch").nth(1).click();
  await page.getByRole("heading", { name: "Comments" }).click();
  await page.getByPlaceholder("Make your comment here...").click();
  await page
    .getByPlaceholder("Make your comment here...")
    .fill("This is a comment done by playwright.");
  await page.getByRole("button", { name: "Add Comment" }).click();
  await page.getByText(": This is a comment done by").click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByPlaceholder("Please enter your comment...").click();
  await page
    .getByPlaceholder("Please enter your comment...")
    .fill("This is a comment done by playwright. Test Edit.");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});
