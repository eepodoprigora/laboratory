import { timeout } from '@/shared/lib/timeout';
import { PAGE_TRANSITION_LEAVE_MS } from '@/shared/сonfig/const';

export const curtainLeave = async (): Promise<void> => {
    await timeout(PAGE_TRANSITION_LEAVE_MS);
};