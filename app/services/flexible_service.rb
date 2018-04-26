module FlexibleService
  class Result
    attr_reader :status, :body

    def initialize(status:, body:)
      @status = status
      @body = body
    end

    def on(status)
      yield body if status == self.status
    end
  end

  class Success < Result
    def success?
      return true
    end
  end

  class Failure < Result
    def success?
      return false
    end
  end

  def success(status, body = nil)
    Success.new(status: status, body: body)
  end

  def failure(status, body = nil)
    Failure.new(status: status, body: body)
  end

  def to_proc
    proc(&method(:call))
  end

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def to_proc
      proc(&method(:call))
    end

    def call(*params)
      self.new.call(*params)
    end
  end
end
