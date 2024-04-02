import { NextRequest, NextResponse } from "next/server";

const NpvCalc = (
  inflows: number[],
  outflows: number[],
  discount: number | number[],
): number => {
  console.log("discount type: ", typeof discount);
  let npv = 0;
  for (let i = 0; i < inflows.length; i++) {
    const net_flow = inflows[i] - outflows[i];
    const t = i + 1;
    const denom =
      typeof discount == "object"
        ? discount.slice(0, t).reduce((acc, val) => acc * (1 + val), 1)
        : (1 + discount) ** t;
    npv += net_flow / denom;
  }
  return npv;
};

export async function POST(request: NextRequest) {
  let body = await request.json();

  let ins = body.inflow;
  let outs = body.outflow;
  let dis = body.discount;

  try {
    while (typeof ins == "string") ins = JSON.parse(ins);
    while (typeof outs == "string") outs = JSON.parse(outs);
    while (typeof dis == "string") dis = JSON.parse(dis);

    const npv = NpvCalc(ins, outs, dis);
    return NextResponse.json({ status: 200, net_present_value: npv });
  } catch (e) {
    console.log(e);
    if (e == undefined || e == null)
      return NextResponse.json({
        status: 500,
        message: "Something went wrong",
      });
    return NextResponse.json({ status: 400, message: e });
  }
}
