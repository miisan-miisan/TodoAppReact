import * as api from "../api/TaskAPI"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { mapQueryStatusFilter } from "react-query/types/core/utils";

const useTasks = () => {
  return useQuery('tasks', () => api.getTasks())
}

const useUpdateDoneTask = () => {
  const queryClient = useQueryClient()

  return useMutation(api.updateDoneTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    },
    onError: () => {
      toast.error('更新に失敗しました')
    }
  })
}

const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation(api.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
      toast.success('登録に成功しました')
    },
    onError: (error: AxiosError) => {
      if (error.response?.data.errors) {
        Object.values(error.response?.data.errors).map(
          (messages: any) => {
            messages.map((message: string) => {
              toast.error(message)
            })
          }
        )
      } else {
        toast.error('登録に失敗しました')
      }
    }
  })
}

export {
  useTasks,
  useUpdateDoneTask,
  useCreateTask
}