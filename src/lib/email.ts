import prisma from './prisma';

export interface SendEmailOptions {
  to: string;
  userId?: string;
  subject: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  type?: 'APPLICATION' | 'JOB_MATCH' | 'SERVICE' | 'INFO';
}

export async function sendTransactionalEmail(options: SendEmailOptions): Promise<{ success: boolean; id: string }> {
  const { to, userId, subject, title, message, actionUrl, type = 'INFO' } = options;

  console.log('----------------------------------------------------');
  console.log(`📧 [TRANSACTIONAL EMAIL DISPATCHED]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Title: ${title}`);
  console.log(`Body: ${message}`);
  if (actionUrl) console.log(`Action Link: ${actionUrl}`);
  console.log('----------------------------------------------------');

  // If a target userId is provided, persist as an in-app notification
  if (userId) {
    try {
      await prisma.notification.create({
        data: {
          userId,
          title,
          message,
          link: actionUrl || null,
          type,
        },
      });
    } catch (err) {
      console.warn('Could not persist in-app notification:', err);
    }
  }

  return { success: true, id: `mock-email-${Date.now()}` };
}
