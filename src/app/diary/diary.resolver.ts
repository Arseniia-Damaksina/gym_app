import { ExerciseSetsService } from './services/exercise-sets.service';
import { ResolveFn } from '@angular/router';
import { ExerciseSet, ExerciseSetList, ExerciseSetListAPI } from './interfaces/exercise-set';
import { inject } from '@angular/core';

// export const diaryResolver: ResolveFn<ExerciseSetList> = (route, state) => {
//   const exerciseSetsService = inject(ExerciseSetsService);
//   return exerciseSetsService.getInitialList();
// };

export const entryResolver: ResolveFn<ExerciseSet> = (route, state) => {
  const entryId = route.paramMap.get('id')!;
  const exerciseSetsService = inject(ExerciseSetsService);
  return exerciseSetsService.getItem(entryId);
};
