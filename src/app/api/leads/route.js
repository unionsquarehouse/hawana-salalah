export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Prepare the data for Bitrix24 API
    const bitrixData = {
      fields: {
        UF_CRM_DEAL_1652196828525:"Ghafwoods",
        UF_CRM_1749797976461:data.title || "Generic",
        UF_CRM_LEAD_1745410999760:data.priceRange,
        UF_CRM_1744840413381:data.bedrooms,
        SOURCE_ID:"UC_MUHIOE",
        UF_CRM_1752665936929:"40958",
        PHONE: [
          {
            VALUE: data.phone,
            VALUE_TYPE: "WORK"
          }
        ],
        EMAIL: [
          {
            VALUE: data.email,
            VALUE_TYPE: "WORK"
          }
        ],
        NAME: data.name
      }
    };
    
    // Add optional fields if they exist
    if (data.interest) {
      bitrixData.fields.UF_CRM_1666273404 = data.interest;
    }
    
    if (data.preferredContact) {
      bitrixData.fields.UF_CRM_1749797214 = data.preferredContact;
    }

    if (data.message) {
      bitrixData.fields.UF_CRM_1663405913 = data.message;
    }

    console.log(bitrixData, "bitrixData");
    

    // Send POST request to Bitrix24
    const response = await fetch(
     process.env.BITRIX_ADD_LEADS_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bitrixData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create lead in Bitrix24");
    }

    const result = await response.json();
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Error creating lead:", error);
    return Response.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
