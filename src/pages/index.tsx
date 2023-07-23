import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const [selected, setSelected] = useState('all')
  const [reload, setReload] = useState(false)
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <Tabs.Root className="TabsRoot mt-10" defaultValue="all">
          <Tabs.List className="TabsList" aria-label="Todolist">
            <Tabs.Trigger
              value="all"
              className={
                selected == 'all'
                  ? 'TabsTrigger mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid  bg-gray-700 pl-[20px]  pr-[20px] font-bold text-white'
                  : 'TabsTrigger mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid border-[#e2e8f0] pl-[20px] pr-[20px]  font-bold text-[#334155]'
              }
              onClick={() => {
                setSelected('all')
              }}
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              className={
                selected == 'pending'
                  ? 'TabsTrigger mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid  bg-gray-700 pl-[20px]  pr-[20px] font-bold text-white'
                  : 'TabsTrigger mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid border-[#e2e8f0] pl-[20px] pr-[20px]  font-bold text-[#334155]'
              }
              value="pending"
              onClick={() => {
                setSelected('pending')
              }}
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              className={
                selected == 'completed'
                  ? 'TabsTrigger mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid  bg-gray-700 pl-[20px]  pr-[20px] font-bold text-white'
                  : 'TabsTrigger mr-[10px]  h-[35px]  rounded-[18px]  border-2 border-solid border-[#e2e8f0] pl-[20px] pr-[20px]  font-bold text-[#334155]'
              }
              value="completed"
              onClick={() => {
                setSelected('completed')
              }}
            >
              Completed
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="all"></Tabs.Content>
          <Tabs.Content className="TabsContent" value="pending"></Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="completed"
          ></Tabs.Content>
        </Tabs.Root>
        <div className="pt-10">
          <TodoList typeLoad={selected} onReload={reload} />
        </div>
        <div className="pt-10">
          <CreateTodoForm
            onAdd={() => {
              setReload(!reload)
            }}
          />
        </div>
      </div>
    </main>
  )
}

export default Index
