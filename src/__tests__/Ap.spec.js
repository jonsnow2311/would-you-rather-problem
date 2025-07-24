import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

beforeEach(() => {
  localStorage.clear();
});

test("Milestone 1: shows loading then renders question and options", async () => {
  render(<App />);
  expect(screen.getByText("Loading next question...")).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText("Would you rather fly or be invisible?")
    ).toBeInTheDocument();
  });

  expect(screen.getByText("Fly")).toBeInTheDocument();
  expect(screen.getByText("Invisible")).toBeInTheDocument();
});

test("Milestone 2: user can vote once, and vote persists across navigation", async () => {
  render(<App />);
  await screen.findByText("Fly");

  // Vote on first question
  fireEvent.click(screen.getByText("Fly"));
  await waitFor(() => {
    expect(screen.getByText("You voted this")).toBeInTheDocument();
  });

  // Try voting again
  fireEvent.click(screen.getByText("Invisible"));
  expect(screen.queryByText("You voted this")).toBeInTheDocument();

  // Navigate to next question
  fireEvent.click(screen.getByText("Next"));
  await screen.findByText("Strength");

  // Navigate back and confirm vote is still selected
  fireEvent.click(screen.getByText("Prev"));
  await waitFor(() => {
    expect(screen.getByText("You voted this")).toBeInTheDocument();
  });
});

test("Milestone 3: vote persists after remount and can be cleared", async () => {
  const { unmount } = render(<App />);
  await screen.findByText("Fly");

  // Vote for an option
  fireEvent.click(screen.getByText("Fly"));

  // Unmount to simulate page reload
  unmount();

  // Remount fresh app instance
  render(<App />);
  await screen.findByText("Fly");

  // Ensure UI still shows the vote after reload
  expect(screen.getByText("You voted this")).toBeInTheDocument();

  // Click Clear All Votes
  fireEvent.click(screen.getByText("Clear All Votes"));

  // Unmount and remount again
  unmount();
  render(<App />);
  await screen.findByText("Fly");

  // Ensure vote is gone
  expect(screen.queryByText("You voted this")).not.toBeInTheDocument();
});

test("Milestone 4: timer skips question and disables voting", async () => {
  render(<App maxTimePerQuestion={1} />);
  await screen.findByText("Fly");

  // Wait for timer to expire (slightly more than 3s)
  await waitFor(
    () => {
      expect(screen.getAllByText("Time’s up")).toHaveLength(2);
    },
    { timeout: 3000 } // give extra buffer
  );

  // Try voting after time's up
  fireEvent.click(screen.getByText("Fly"));

  // It should still show skipped, and not "You voted this"
  expect(screen.queryByText("You voted this")).not.toBeInTheDocument();
  expect(screen.getAllByText("Time’s up")).toHaveLength(2);
});
