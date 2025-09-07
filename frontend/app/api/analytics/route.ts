import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const period = searchParams.get('period') || '30d'; // 7d, 30d, 90d, 1y

        // Mock analytics data
        const analytics = {
            overview: {
                totalUsers: 15420,
                totalCourses: 10,
                totalRevenue: 2847500,
                averageRating: 4.8,
                completionRate: 78.5
            },
            userGrowth: {
                period,
                data: [
                    { date: "2024-01-01", users: 12000, newUsers: 150 },
                    { date: "2024-01-02", users: 12150, newUsers: 180 },
                    { date: "2024-01-03", users: 12330, newUsers: 200 },
                    { date: "2024-01-04", users: 12530, newUsers: 220 },
                    { date: "2024-01-05", users: 12750, newUsers: 190 },
                    { date: "2024-01-06", users: 12940, newUsers: 210 },
                    { date: "2024-01-07", users: 13150, newUsers: 230 },
                    { date: "2024-01-08", users: 13380, newUsers: 240 },
                    { date: "2024-01-09", users: 13620, newUsers: 260 },
                    { date: "2024-01-10", users: 13880, newUsers: 280 },
                    { date: "2024-01-11", users: 14160, newUsers: 300 },
                    { date: "2024-01-12", users: 14460, newUsers: 320 },
                    { date: "2024-01-13", users: 14780, newUsers: 340 },
                    { date: "2024-01-14", users: 15120, newUsers: 360 },
                    { date: "2024-01-15", users: 15420, newUsers: 380 }
                ]
            },
            coursePerformance: [
                {
                    courseId: 1,
                    title: "Fundamentos de Desenvolvimento Web",
                    enrollments: 3456,
                    completions: 2890,
                    revenue: 568000,
                    rating: 4.7,
                    completionRate: 83.6
                },
                {
                    courseId: 2,
                    title: "React JS Avançado",
                    enrollments: 2341,
                    completions: 1872,
                    revenue: 837000,
                    rating: 4.9,
                    completionRate: 80.0
                },
                {
                    courseId: 3,
                    title: "Node.js APIs REST",
                    enrollments: 892,
                    completions: 624,
                    revenue: 185000,
                    rating: 4.9,
                    completionRate: 70.0
                },
                {
                    courseId: 4,
                    title: "Python Data Science",
                    enrollments: 1567,
                    completions: 1253,
                    revenue: 497000,
                    rating: 4.8,
                    completionRate: 80.0
                },
                {
                    courseId: 5,
                    title: "DevOps e CI/CD",
                    enrollments: 445,
                    completions: 311,
                    revenue: 108000,
                    rating: 4.8,
                    completionRate: 70.0
                }
            ],
            topCategories: [
                { category: "Frontend", enrollments: 5797, revenue: 1405000 },
                { category: "Data Science", enrollments: 1567, revenue: 497000 },
                { category: "Backend", enrollments: 892, revenue: 185000 },
                { category: "DevOps", enrollments: 445, revenue: 108000 },
                { category: "Mobile", enrollments: 2221, revenue: 657000 }
            ],
            userEngagement: {
                averageSessionDuration: 45, // minutes
                averageLessonsPerDay: 3.2,
                averageStudyTime: 2.5, // hours per week
                activeUsers: 12336, // users active in last 7 days
                retentionRate: 85.2 // % of users who return after 30 days
            },
            revenueMetrics: {
                monthlyRecurringRevenue: 284750,
                averageOrderValue: 347,
                conversionRate: 12.5, // % of visitors who enroll
                refundRate: 2.1,
                topRevenueSources: [
                    { source: "Direct", revenue: 1423750, percentage: 50 },
                    { source: "Organic Search", revenue: 854250, percentage: 30 },
                    { source: "Social Media", revenue: 569500, percentage: 20 }
                ]
            },
            geographicData: [
                { country: "Brasil", users: 12336, revenue: 2278000 },
                { country: "Portugal", users: 1542, revenue: 284750 },
                { country: "Estados Unidos", users: 924, revenue: 170750 },
                { country: "Canadá", users: 462, revenue: 85425 },
                { country: "Outros", users: 1156, revenue: 213575 }
            ]
        };

        return NextResponse.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar analytics'
            },
            { status: 500 }
        );
    }
} 