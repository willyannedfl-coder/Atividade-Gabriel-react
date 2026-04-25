import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem('listaTarefas');
    return salvas ? JSON.parse(salvas) : [];
  });
  
  const [input, setInput] = useState("");
  const [data, setData] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('listaTarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (input.trim() !== "") {
      const novaTarefa = {
        id: Date.now(),
        texto: input,
        dataAgendada: data.toLocaleDateString('pt-BR')
      };
      setTarefas([...tarefas, novaTarefa]);
      setInput("");
    }
  }

  return (
    
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold text-dark">Planner de Tarefas</h1>
      
      {}
      <Row className="justify-content-center">
        
        {}
        <Col lg={5} md={6} className="mb-4">
          <Card className="shadow-sm border-0 p-3">
            <Card.Body>
              <h5 className="mb-3 text-secondary text-center">Selecionar Data</h5>
              <Calendar 
                onChange={setData} 
                value={data} 
                className="w-100 border-0 rounded shadow-sm"
              />
              <div className="mt-3 text-center badge bg-primary d-block p-2">
                Data selecionada: {data.toLocaleDateString('pt-BR')}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {}
        <Col lg={5} md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="mb-3 text-secondary">Minhas Tarefas</h5>
              
              {}
              <Form.Group className="d-flex gap-2 mb-4">
                <Form.Control 
                  type="text"
                  placeholder="Nova tarefa..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
                />
                <Button variant="success" onClick={adicionarTarefa}>Add</Button>
              </Form.Group>

              {}
              <ListGroup variant="flush" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {tarefas.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center py-3">
                    <div>
                      <div className="fw-bold">{item.texto}</div>
                      <small className="text-muted">Prazo: {item.dataAgendada}</small>
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => setTarefas(tarefas.filter(t => t.id !== item.id))}
                    >
                      &times;
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {tarefas.length === 0 && (
                <p className="text-center text-muted mt-4">Nenhuma tarefa pendente.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;