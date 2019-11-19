const TARGET_STRING = "hello world"

//"struct" for agents
function Agent(str) {
    this.str = str
    this.fitness = 0
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function fitness(str) {
    var same = 0
    for (var i = 0; i < str.length; i++) {
      if (str[i] == TARGET_STRING[i])
        same++
    }
    return same / str.length
}

function makeid(length) {
   var result           = ''
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '
   var charactersLength = characters.length
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return result;
}

class Population {
  constructor(pop_size) {
    this.pop_size = pop_size
    this.pop = []
    this.fitnesses = []
    this.totalFitness = 0
    for (var i = 0; i < pop_size; i++) {
      this.pop.push(new Agent(makeid(TARGET_STRING.length)))
    }
  }

  //evaluates, normalizes, and sorts each agent
  evaluatePopulation() {
    let totalFitness = 0
    this.pop.forEach(function(agent) {
        let f = fitness(agent.str)
        agent.fitness = f
        totalFitness += f
    })
    this.pop.forEach(function(agent) {
        agent.fitness /= totalFitness
    }) 
    this.pop.sort(function(agent1, agent2) {
        return agent2.fitness - agent1.fitness
    })
  }


  topPerformer() {
    return this.pop[0]
  }

  crossover(a, b) {
    var res = ''
    for (var i = 0; i < a.str.length; i++) {
      if (Math.random() > .5)
        res += a.str[i]
      else
        res += b.str[i]
    }
    return new Agent(res)
  }

  newPopulation(mutationRate) {
    this.evaluatePopulation()
    console.log(this.topPerformer().str)
    var p1, p2
    var newpop = []
    for (var i = 0; i < this.pop_size; i++) {
      p1 = this.pickParent()
      p2 = p1
      while (p2 == p1)
        p2 = this.pickParent()
      newpop.push(this.mutate(this.crossover(p1, p2), mutationRate))
    }

    this.pop = newpop
  }

  mutate(agent, rate) {
    var res = ''
    for (var i = 0; i < agent.str.length; i++) {
      if (Math.random() < rate)
        res += makeid(1)
      else
        res += agent.str[i]
    }
    agent.str = res
    return agent
  }

  pickParent(fitnesses) {
    var target = Math.random()
    var curr = 0
    var i = 0
    while (curr < target) {
      if (i == this.pop.length) return this.pop[0]
      curr += this.pop[i++].fitness
    }
    return this.pop[i-1]
  }
}



/////////RUNNING EVOLUTION, SHOWING IT ON HTML PAGE/////////////
var p = new Population(200)

function update() {
    p.newPopulation(0.1)
    if (p.topPerformer().str == TARGET_STRING) return true
    return false
}
$(document).ready(function() {
    while (!update()) {}
})
