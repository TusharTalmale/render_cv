// src/app/api/generate-pdf/route.tsx
import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import MyResumeDocument from '../../../components/pdf/MyResumeDocument';
import { ResumeData } from '../../../lib/resumeData';

export async function POST(req: Request) {
  try {
    const resumeData: ResumeData = await req.json();

    const docStream = await renderToStream(<MyResumeDocument data={resumeData} />);

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      docStream.on('data', (chunk) => chunks.push(chunk));
      docStream.on('end', () => resolve());
      docStream.on('error', reject);
    });
    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { message: 'Failed to generate PDF', error: (error as Error).message },
      { status: 500 }
    );
  }
}