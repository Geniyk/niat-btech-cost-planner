
import { NextResponse } from "next/server";

function generateChecklist(body: any): string {
  const total = Number(body.total || 0);
  const budget = Number(body.budget || 0);
  const universityFee = Number(body.universityFee || 0);
  const programFee = Number(body.programFee || 0);
  const hostelFee = Number(body.hostelFee || 0);
  const currency = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

  const language = body.language || "English";

  const budgetNote =
    total > 0
      ? `Your entered costs total ${currency(total)}. ${
          budget > 0
            ? total <= budget
              ? `This is ${currency(budget - total)} below your stated budget of ${currency(budget)}.`
              : `This exceeds your stated budget of ${currency(total - budget)}.`
            : "Enter a budget to compare your costs against it."
        }`
      : "Enter your estimated costs to calculate your total.";

  const breakdown = [
    `University fee: ${currency(universityFee)}`,
    `Program/upskilling fee: ${currency(programFee)}`,
    `Hostel and other costs: ${currency(hostelFee)}`,
  ].join("\n");

  const questions = [
    "What is the complete university fee for the entire degree, including deposits and examination fees?",
    "Is the program/upskilling fee separate, and exactly what does it cover?",
    "What additional costs apply to accommodation, transport, devices, and living expenses?",
  ];

  const result = `Budget note\n${budgetNote}

Entered cost breakdown
${breakdown}

Questions to ask the counsellor
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Next step
Request a written fee breakdown from the specific institution before making a decision.

Disclaimer: This is general guidance based only on the amounts entered, not an official fee quote.`;

  // Keep the output deterministic; never invent fees or college information.
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json({
      analysis: generateChecklist(body),
      mode: "local",
    });
  } catch (error) {
    console.error("AI checklist request error:", error);

    return NextResponse.json(
      { error: "Could not generate the budget checklist. Please try again." },
      { status: 400 }
    );
  }
}
