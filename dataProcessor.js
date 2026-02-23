require('dotenv').config();
const { readHealthData } = require('./healthReader');
const { readWorkoutData } = require('./workoutReader');

async function processFitnessData() {
    const userName = process.env.USER_NAME || 'Guest';
    const weeklyGoal = process.env.WEEKLY_GOAL || 0;

    console.log(`--- Fitness Report for ${userName} ---`);
    console.log(`Weekly Goal: ${weeklyGoal} minutes\n`);

    try {
        // Run both readers concurrently
        const [healthData, workoutData] = await Promise.all([
            readHealthData('./data/health-metrics.json'),
            readWorkoutData('./data/workouts.csv')
        ]);

        console.log('Health Metrics Loaded:', healthData.length, 'records');
        console.log('Workout Sessions Loaded:', workoutData.length, 'records');

        // Example calculation: Sum of workout durations
        const totalMinutes = workoutData.reduce((sum, session) => {
            return sum + parseInt(session.duration || 0);
        }, 0);

        console.log(`\nTotal Active Minutes: ${totalMinutes}`);
        
        if (totalMinutes >= weeklyGoal) {
            console.log('Congratulations! You hit your weekly goal.');
        } else {
            console.log(`Keep going! You need ${weeklyGoal - totalMinutes} more minutes.`);
        }

    } catch (error) {
        console.error('Failed to process fitness data:', error.message);
    }
}

processFitnessData();
