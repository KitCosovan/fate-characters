// src/hooks/useCampaignRole.ts

import { useCampaignStore } from '../store/campaignStore'

// Может ли пользователь управлять НПС?
// Да — если нет кампаний, или он ГМ хотя бы в одной
export function useCanManageNpcs(): boolean {
  const campaigns = useCampaignStore(s => s.campaigns)
  if (campaigns.length === 0) return true
  return campaigns.some(c => c.userRole === 'gm')
}

// Роль в конкретной кампании
export function useRoleInCampaign(campaignId: string | undefined) {
  const campaigns = useCampaignStore(s => s.campaigns)
  if (!campaignId) return 'gm' as const
  return campaigns.find(c => c.id === campaignId)?.userRole ?? 'gm'
}
