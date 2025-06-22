import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, mapping, fileName } = body;

    // Log the import request for debugging
    console.log('Mint import request:', {
      fileName,
      rowCount: data?.length || 0,
      mapping,
      sampleData: data?.slice(0, 2) // First 2 rows for debugging
    });

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation of required fields
    const mappedFields = Object.values(mapping).filter(field => field && field !== 'skip');
    if (!mappedFields.includes('date') || !mappedFields.includes('amount')) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'Date and Amount fields are required for import' 
        },
        { status: 400 }
      );
    }

    // Mock successful response
    return NextResponse.json({
      success: true,
      message: 'Import completed successfully',
      summary: {
        totalRecords: data?.length || 0,
        imported: data?.length || 0,
        skipped: 0,
        errors: 0
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Import API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Import failed',
        message: 'An error occurred while processing your import' 
      },
      { status: 500 }
    );
  }
} 