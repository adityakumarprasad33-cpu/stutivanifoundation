/* eslint-disable @typescript-eslint/no-explicit-any */
 
export interface AIExecutiveSummary {
  summaryText: string;
  keyHighlights: string[];
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  generatedAt: Date;
}

export interface AIForecast {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidenceScore: number; // 0 to 1
  timeframe: string;
}

export interface AIRiskDetection {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: string[];
  recommendations: string[];
}

export interface AIOrganizationHealthScore {
  score: number; // 0 to 100
  financialScore: number;
  volunteerScore: number;
  programScore: number;
  generatedAt: Date;
}

export interface AIAnalyticsEngine {
  generateExecutiveSummary(): Promise<AIExecutiveSummary>;
  generateFundingInsights(): Promise<AIForecast[]>;
  generateVolunteerInsights(): Promise<AIForecast[]>;
  generateProgramInsights(): Promise<any>;
  generateProjectInsights(): Promise<any>;
  generateCampaignInsights(): Promise<any>;
  detectRisks(): Promise<AIRiskDetection>;
  getOrganizationHealthScore(): Promise<AIOrganizationHealthScore>;
  getRecommendations(): Promise<string[]>;
}
