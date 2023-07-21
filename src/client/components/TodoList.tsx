import { type SVGProps, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/utils/client/api'

/**
 * QUESTION 3:
 * -----------
 * A todo has 2 statuses: "pending" and "completed"
 *  - "pending" state is represented by an unchecked checkbox
 *  - "completed" state is represented by a checked checkbox, darker background,
 *    and a line-through text
 *
 * We have 2 backend apis:
 *  - (1) `api.todo.getAll`       -> a query to get all todos
 *  - (2) `api.todoStatus.update` -> a mutation to update a todo's status
 *
 * Example usage for (1) is right below inside the TodoList component. For (2),
 * you can find similar usage (`api.todo.create`) in src/client/components/CreateTodoForm.tsx
 *
 * If you use VSCode as your editor , you should have intellisense for the apis'
 * input. If not, you can find their signatures in:
 *  - (1) src/server/api/routers/todo-router.ts
 *  - (2) src/server/api/routers/todo-status-router.ts
 *
 * Your tasks are:
 *  - Use TRPC to connect the todos' statuses to the backend apis
 *  - Style each todo item to reflect its status base on the design on Figma
 *
 * Documentation references:
 *  - https://trpc.io/docs/client/react/useQuery
 *  - https://trpc.io/docs/client/react/useMutation
 *
 *
 *
 *
 *
 * QUESTION 4:
 * -----------
 * Implement UI to delete a todo. The UI should look like the design on Figma
 *
 * The backend api to delete a todo is `api.todo.delete`. You can find the api
 * signature in src/server/api/routers/todo-router.ts
 *
 * NOTES:
 *  - Use the XMarkIcon component below for the delete icon button. Note that
 *  the icon button should be accessible
 *  - deleted todo should be removed from the UI without page refresh
 *
 * Documentation references:
 *  - https://www.sarasoueidan.com/blog/accessible-icon-buttons
 *
 *
 *
 *
 *
 * QUESTION 5:
 * -----------
 * Animate your todo list using @formkit/auto-animate package
 *
 * Documentation references:
 *  - https://auto-animate.formkit.com
 */

export const TodoList = () => {
  const { data: todos = [] } = api.todo.getAll.useQuery(
    {
      statuses: ['completed', 'pending'],
    },
    {
      refetchOnWindowFocus: false,
    }
  )
  const [isFirst, setisFirst] = useState(true)
  const apiContext = api.useContext()
  const [animationParent] = useAutoAnimate()
  const { mutate: updateToDo } = api.todoStatus.update.useMutation({
    onSuccess: () => {
      setisFirst(false)
      switch (selected) {
        case 'all':
          apiContext.todo.getAll
            .fetch({
              statuses: ['completed', 'pending'],
            })
            .then((value) => {
              setToDo1(value)
            })
          setSelected('all')
          break
        case 'completed':
          apiContext.todo.getAll
            .fetch({
              statuses: ['completed'],
            })
            .then((value) => {
              setToDo1(value)
            })
          setSelected('completed')
          break
        case 'pending':
          apiContext.todo.getAll
            .fetch({
              statuses: ['pending'],
            })
            .then((value) => {
              setToDo1(value)
            })
          setSelected('pending')
          break
        default:
          break
      }
    },
  })
  const { mutate: deleteToDo } = api.todo.delete.useMutation({
    onSuccess: () => {
      setisFirst(false)
      // apiContext.todo.getAll.refetch().then((value) => {
      //   setToDo1(todos);
      // });
      apiContext.todo.getAll
        .fetch({
          statuses: ['completed', 'pending'],
        })
        .then((value) => {
          setToDo1(value)
        })
      setSelected('all')
    },
  })

  const [selected, setSelected] = useState('all')
  const [todos1, setToDo1] = useState(
    api.todo.getAll.useQuery(
      {
        statuses: ['completed', 'pending'],
      },
      {
        refetchOnWindowFocus: false,
      }
    ).data ?? todos
  )
  function changeData(item: string) {
    setisFirst(false)
    switch (item) {
      case 'all':
        apiContext.todo.getAll
          .fetch({
            statuses: ['completed', 'pending'],
          })
          .then((value) => {
            setToDo1(value)
          })
        // setToDo1(api.todo.getAll.useQuery(
        //   {
        //     statuses: ['completed', 'pending'],
        //   }
        // ).data ?? []);
        break
      case 'completed':
        apiContext.todo.getAll
          .fetch({
            statuses: ['completed'],
          })
          .then((value) => {
            setToDo1(value)
          })
        // setToDo1(api.todo.getAll.useQuery(
        //   {
        //     statuses: ['completed'],
        //   }
        // ).data ?? []);
        break
      case 'pending':
        apiContext.todo.getAll
          .fetch({
            statuses: ['pending'],
          })
          .then((value) => {
            setToDo1(value)
          })
        // setToDo1(api.todo.getAll.useQuery(
        //   {
        //     statuses: [ 'pending'],
        //   },
        //   {
        //     refetchOnWindowFocus: false,
        //   }
        // ).data ?? []);
        break
      default:
        break
    }
  }

  return (
    <div data-has-animation={true}>
      <div className="mb-[10px]">
        <button
          className={
            selected == 'all'
              ? 'mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid  bg-gray-700 pl-[20px]  pr-[20px] font-bold text-white'
              : 'mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid border-[#e2e8f0] pl-[20px] pr-[20px]  font-bold text-[#334155]'
          }
          type="button"
          onClick={() => {
            setSelected('all')
            changeData('all')
          }}
        >
          All
        </button>
        <button
          className={
            selected == 'pending'
              ? 'mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid  bg-gray-700 pl-[20px]  pr-[20px] font-bold text-white'
              : 'mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid border-[#e2e8f0] pl-[20px] pr-[20px]  font-bold text-[#334155]'
          }
          type="button"
          onClick={() => {
            setSelected('pending')
            changeData('pending')
          }}
        >
          Pending
        </button>
        <button
          className={
            selected == 'completed'
              ? 'mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid  bg-gray-700 pl-[20px]  pr-[20px] font-bold text-white'
              : 'mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid border-[#e2e8f0] pl-[20px] pr-[20px]  font-bold text-[#334155]'
          }
          type="button"
          onClick={() => {
            setSelected('completed')
            changeData('completed')
          }}
        >
          Completed
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-y-3" ref={animationParent}>
        {isFirst
          ? todos.map((todo) => (
              <li key={todo.id}>
                <div
                  className={
                    todo.status == 'completed'
                      ? 'flex items-center rounded-12 border border-gray-200 bg-[#f8fafc] px-4 py-3 shadow-sm'
                      : 'flex items-center rounded-12 border border-gray-200 px-4 py-3 shadow-sm '
                  }
                >
                  <Checkbox.Root
                    checked={todo.status != 'pending'}
                    id={String(todo.id)}
                    onCheckedChange={(e) => {
                      updateToDo({
                        status: e == true ? 'completed' : 'pending',
                        todoId: todo.id,
                      })
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-4 w-4 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>

                  <label
                    htmlFor={String(todo.id)}
                    className={
                      todo.status == 'completed'
                        ? 'block pl-3 font-medium text-[#64748b] line-through'
                        : 'block pl-3 font-medium'
                    }
                  >
                    {todo.body}
                  </label>
                  <button
                    name="Delete"
                    aria-label="Delete"
                    id="menu-trigger"
                    className="ml-auto mr-0"
                    onClick={() => {
                      deleteToDo({
                        id: todo.id,
                      })
                    }}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      width="32px"
                      height="32px"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <XMarkIcon></XMarkIcon>
                    </svg>
                  </button>
                </div>
              </li>
            ))
          : todos1.map((todo) => (
              <li key={todo.id}>
                <div
                  className={
                    todo.status == 'completed'
                      ? 'flex items-center rounded-12 border border-gray-200 bg-[#f8fafc] px-4 py-3 shadow-sm'
                      : 'flex items-center rounded-12 border border-gray-200 px-4 py-3 shadow-sm '
                  }
                >
                  <Checkbox.Root
                    checked={todo.status != 'pending'}
                    id={String(todo.id)}
                    onCheckedChange={(e) => {
                      updateToDo({
                        status: e == true ? 'completed' : 'pending',
                        todoId: todo.id,
                      })
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-4 w-4 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>

                  <label
                    htmlFor={String(todo.id)}
                    className={
                      todo.status == 'completed'
                        ? 'block pl-3 font-medium text-[#64748b] line-through'
                        : 'block pl-3 font-medium'
                    }
                  >
                    {todo.body}
                  </label>
                  <button
                    name="Delete"
                    aria-label="Delete"
                    id="menu-trigger"
                    className="ml-auto mr-0"
                    onClick={() => {
                      deleteToDo({
                        id: todo.id,
                      })
                    }}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      width="32px"
                      height="32px"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <XMarkIcon></XMarkIcon>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
      </ul>
    </div>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
