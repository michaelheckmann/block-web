// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  exercise: {
    id: 42,
    name: 'Bench Press',
    setGroups: [
      {
        id: 0,
        order: 0,
        sets: [
          {
            id: 0,
            weight: 100,
            reps: 10,
          },
          {
            id: 1,
            weight: 100,
            reps: 10,
          },
          {
            id: 2,
            weight: 100,
            reps: 10,
          },
        ],
        workout: {
          done: true,
          createdAt: '2022-09-02T12:34:56Z',
          setGroups: [
            {
              id: 0,
              exercise: {
                name: 'Bench Press',
              },
              sets: [
                {
                  id: 0,
                },
                {
                  id: 1,
                },
                {
                  id: 2,
                },
              ],
            },
            {
              id: 1,
              exercise: {
                name: 'Squat',
              },
              sets: [
                {
                  id: 3,
                },
                {
                  id: 5,
                },
              ],
            },
          ],
        },
      },
      {
        id: 1,
        order: 1,
        sets: [
          {
            id: 0,
            weight: 100,
            reps: 10,
          },
        ],
        workout: {
          done: true,
          createdAt: '2020-01-01T12:34:56Z',
          setGroups: [
            {
              id: 0,
              exercise: {
                name: 'Dip',
              },
              sets: [
                {
                  id: 0,
                },
                {
                  id: 1,
                },
                {
                  id: 2,
                },
              ],
            },
            {
              id: 1,
              exercise: {
                name: 'Bench Press',
              },
              sets: [
                {
                  id: 3,
                },
              ],
            },
            {
              id: 2,
              exercise: {
                name: 'Curl',
              },
              sets: [
                {
                  id: 3,
                },
              ],
            },
          ],
        },
      },
      {
        id: 2,
        order: 2,
        sets: [
          {
            id: 0,
            weight: 10,
            reps: 10,
          },
          {
            id: 1,
            weight: 10,
            reps: 10,
          },
          {
            id: 2,
            weight: 10,
            reps: 10,
          },
        ],
        workout: {
          done: true,
          createdAt: '2019-08-02T12:34:56Z',
          setGroups: [
            {
              id: 0,
              exercise: {
                name: 'Dip',
              },
              sets: [
                {
                  id: 0,
                },
                {
                  id: 1,
                },
                {
                  id: 2,
                },
              ],
            },
            {
              id: 1,
              exercise: {
                name: 'Curl',
              },
              sets: [
                {
                  id: 3,
                },
              ],
            },
            {
              id: 2,
              exercise: {
                name: 'Bench Press',
              },
              sets: [
                {
                  id: 7,
                },
                {
                  id: 8,
                },
                {
                  id: 10,
                },
              ],
            },
          ],
        },
      },
      {
        id: 3,
        order: 2,
        sets: [
          {
            id: 0,
            weight: 10,
            reps: 10,
          },
          {
            id: 1,
            weight: 10,
            reps: 10,
          },
          {
            id: 2,
            weight: 10,
            reps: 10,
          },
          {
            id: 3,
            weight: 10,
            reps: 10,
          },
          {
            id: 4,
            weight: 10,
            reps: 10,
          },
        ],
        workout: {
          done: true,
          createdAt: '2019-07-02T12:34:56Z',
          setGroups: [
            {
              id: 0,
              exercise: {
                name: 'Dip',
              },
              sets: [
                {
                  id: 0,
                },
                {
                  id: 1,
                },
                {
                  id: 2,
                },
              ],
            },
            {
              id: 1,
              exercise: {
                name: 'Curl',
              },
              sets: [
                {
                  id: 3,
                },
              ],
            },
            {
              id: 3,
              exercise: {
                name: 'Bench Press',
              },
              sets: [
                {
                  id: 21,
                },
                {
                  id: 22,
                },
                {
                  id: 23,
                },
                {
                  id: 24,
                },
                {
                  id: 25,
                },
              ],
            },
          ],
        },
      },
    ],
  },
})
