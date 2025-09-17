import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan: React.FC = () => {
  return (
  <div className="text-center py-24 px-4">
    <h1 className="text-4xl font-semibold">Choose your plan</h1>
    
    <p className="py-4 text-gray-600">Select the plan that best fits your needs.</p>
{/* 
<div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
    <PricingTable />
</div> */}

<div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 gap-8 text-center">
  <PricingTable />
  
</div>

    
  </div>
 );
}

export default Plan;
