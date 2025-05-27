import { Injectable } from '@angular/core';

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description?: string;
  videoUrl?: string;
  instructions?: string[];
  category?: string;
  equipment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private exercises: Exercise[] = [
    { 
      id: 1, 
      name: 'Ab Wheel', 
      muscleGroup: 'Core',
      category: 'Bodyweight',
      equipment: 'Ab Wheel',
      instructions: [
        'Hold the ab wheel with both hands and kneel on the floor.',
        'Place the ab roller on the floor in front of your knees.',
        'Slowly roll the wheel forward, extending your body.',
        'Roll back to the starting position.'
      ]
    },
    { 
      id: 2, 
      name: 'Bench Press', 
      muscleGroup: 'Chest',
      category: 'Weighted',
      equipment: 'Barbell',
      instructions: [
        'Lie on the bench with your eyes under the bar.',
        'Grip the bar with hands slightly wider than shoulder-width.',
        'Unrack the bar and lower it to your mid-chest.',
        'Press the bar back up to the starting position.'
      ]
    },
    { 
      id: 3, 
      name: 'Squat', 
      muscleGroup: 'Legs',
      category: 'Weighted',
      equipment: 'Barbell',
      instructions: [
        'Stand with feet shoulder-width apart.',
        'Lower your body by bending knees and hips.',
        'Keep your chest up and back straight.',
        'Return to standing position.'
      ]
    },
    { 
      id: 4, 
      name: 'Deadlift', 
      muscleGroup: 'Back',
      category: 'Weighted',
      equipment: 'Barbell',
      instructions: [
        'Stand with feet hip-width apart, barbell over mid-foot.',
        'Bend at hips and knees to grip the bar.',
        'Keep back straight as you lift the bar by extending hips and knees.',
        'Lower the bar back to the ground with control.'
      ]
    },
    { 
      id: 5, 
      name: 'Pull-Up', 
      muscleGroup: 'Back',
      category: 'Bodyweight',
      equipment: 'Pull-Up Bar',
      instructions: [
        'Grab the bar with palms facing away, wider than shoulder-width.',
        'Hang with arms fully extended.',
        'Pull yourself up until chin clears the bar.',
        'Lower yourself back down with control.'
      ]
    },
    { 
      id: 6, 
      name: 'Dumbbell Shoulder Press', 
      muscleGroup: 'Shoulders',
      category: 'Weighted',
      equipment: 'Dumbbells',
      instructions: [
        'Sit on bench with back support, holding dumbbells at shoulder height.',
        'Press the weights upward until arms are fully extended.',
        'Lower the dumbbells back to shoulder height.',
        'Keep core engaged throughout the movement.'
      ]
    },
    { 
      id: 7, 
      name: 'Barbell Row', 
      muscleGroup: 'Back',
      category: 'Weighted',
      equipment: 'Barbell',
      instructions: [
        'Bend at hips with knees slightly bent, grip bar slightly wider than shoulder-width.',
        'Pull bar toward lower chest, squeezing shoulder blades.',
        'Lower bar back down with control.',
        'Keep back straight throughout the movement.'
      ]
    },
    { 
      id: 8, 
      name: 'Dumbbell Bicep Curl', 
      muscleGroup: 'Arms',
      category: 'Weighted',
      equipment: 'Dumbbells',
      instructions: [
        'Stand holding dumbbells at sides with palms facing forward.',
        'Curl weights while keeping elbows close to torso.',
        'Squeeze biceps at top of movement.',
        'Lower weights back down with control.'
      ]
    },
    { 
      id: 9, 
      name: 'Triceps Dip', 
      muscleGroup: 'Arms',
      category: 'Bodyweight',
      equipment: 'Parallel Bars',
      instructions: [
        'Grip parallel bars and lift yourself up.',
        'Lower body by bending elbows to 90 degrees.',
        'Push back up to starting position.',
        'Keep torso upright and elbows close to body.'
      ]
    },
    { 
      id: 10, 
      name: 'Leg Press', 
      muscleGroup: 'Legs',
      category: 'Weighted',
      equipment: 'Leg Press Machine',
      instructions: [
        'Sit on machine with feet shoulder-width apart on platform.',
        'Lower safety bars and press platform away.',
        'Bend knees to lower platform toward chest.',
        'Press back to starting position without locking knees.'
      ]
    }
  ];

  constructor() {}

  getAll(): Exercise[] {
    return [...this.exercises];
  }

  getById(id: number): Exercise | undefined {
    return this.exercises.find(ex => ex.id === id);
  }

  getExercisesGroupedByLetter(): {letter: string, exercises: Exercise[]}[] {
    const grouped = this.exercises.reduce((acc, exercise) => {
      const firstLetter = exercise.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(exercise);
      return acc;
    }, {} as Record<string, Exercise[]>);

    return Object.entries(grouped)
      .map(([letter, exercises]) => ({ letter, exercises }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }
}