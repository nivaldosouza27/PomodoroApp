import { 
  CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput 
} from "./styles";
import { Play } from "phosphor-react";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: 
    zod.number()
    .min(5, "O ciclo deve ter no mínimo 5 minutos")
    .max(60, "O ciclo deve ter no máximo 60 minutos"),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    // defaultValues: {
      // task: '',
      // minutesAmmount: 0,
    // }
  })

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch('task')
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
          id="task" 
          list="tasksuggestions"
          placeholder="Dê um nome para o seu projeto!"
          {...register('task')}
          />

          <datalist id="tasksuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="">Durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber:true})}
            />
          <span>Minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}