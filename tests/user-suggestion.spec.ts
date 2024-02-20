import { test, expect } from "@playwright/test";
import { getURL } from "next/dist/shared/lib/utils";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "User" }).click();
  await page.getByRole("tab", { name: "Suggestion" }).click();
  await page.getByPlaceholder("Select your recipients here...").click();
  await page.getByRole("option", { name: "Stitch" }).click();
  await page.getByRole("option", { name: "Bobio Jones" }).click();
  await page.getByPlaceholder("Please write your subject").click();
  await page
    .getByPlaceholder("Please write your subject")
    .fill("Playwright Testing Suggestion");
  await page.getByPlaceholder("Please write your message").click();
  await page
    .getByPlaceholder("Please write your message")
    .fill("This is a test done by playwright!");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you. Your message has" })
  ).toBeVisible();
});
